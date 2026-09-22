# ================================================================
# Introduction to Embeddings with the OpenAI API
# All embedding-related code from the slides, in order (Ch1 -> Ch2 -> Ch3)
# ================================================================


# ============================================================
# CHAPTER 1 — What are Embeddings? (basics, vector space, similarity)
# ============================================================

# --- Creating an Embeddings request ---
from openai import OpenAI

client = OpenAI(api_key="<OPENAI_API_KEY>")
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="Embeddings are a numerical representation of text that can be used to "
          "measure the relatedness between two pieces of text."
)

response_dict = response.model_dump()
print(response_dict)

# --- Extracting the embeddings ---
print(response_dict['data'][0]['embedding'])

# --- Example data: headlines to embed ---
articles = [
    {"headline": "Economic Growth Continues Amid Global Uncertainty", "topic": "Business"},
    {"headline": "Interest rates fall to historic lows", "topic": "Business"},
    {"headline": "Scientists Make Breakthrough Discovery in Renewable Energy", "topic": "Science"},
    {"headline": "India Successfully Lands Near Moon's South Pole", "topic": "Science"},
    {"headline": "New Particle Discovered at CERN", "topic": "Science"},
    {"headline": "Tech Company Launches Innovative Product to Improve Online Accessibility", "topic": "Tech"},
    {"headline": "Tech Giant Buys 49% Stake In AI Startup", "topic": "Tech"},
    {"headline": "New Social Media Platform Has Everyone Talking!", "topic": "Tech"},
    {"headline": "The Blues get promoted on the final day of the season!", "topic": "Sport"},
    {"headline": "1.5 Billion Tune-in to the World Cup Final", "topic": "Sport"}
]

# --- Embedding multiple inputs at once (batching) ---
headline_text = [article['headline'] for article in articles]
headline_text

response = client.embeddings.create(
    model="text-embedding-3-small",
    input=headline_text
)
response_dict = response.model_dump()

# --- Attaching each embedding back to its article ---
for i, article in enumerate(articles):
    article['embedding'] = response_dict['data'][i]['embedding']

print(articles[:2])

# --- Embedding vector length is fixed regardless of input length ---
len(articles[0]['embedding'])   # 1536
len(articles[5]['embedding'])   # 1536

# --- Dimensionality reduction with t-SNE (for visualization) ---
from sklearn.manifold import TSNE
import numpy as np

embeddings = [article['embedding'] for article in articles]

tsne = TSNE(n_components=2, perplexity=5)
embeddings_2d = tsne.fit_transform(np.array(embeddings))

# --- Visualizing the embeddings ---
import matplotlib.pyplot as plt

plt.scatter(embeddings_2d[:, 0], embeddings_2d[:, 1])

topics = [article['topic'] for article in articles]
for i, topic in enumerate(topics):
    plt.annotate(topic, (embeddings_2d[i, 0], embeddings_2d[i, 1]))

plt.show()

# --- Measuring similarity: cosine distance ---
from scipy.spatial import distance

distance.cosine([0, 1], [1, 0])  # 1.0
# Ranges from 0 to 2; smaller = more similar

# --- Reusable helper: create_embeddings() ---
def create_embeddings(texts):
    response = client.embeddings.create(
        model="text-embedding-3-small",
        input=texts
    )
    response_dict = response.model_dump()
    return [data['embedding'] for data in response_dict['data']]

print(create_embeddings(["Python is the best!", "R is the best!"]))
print(create_embeddings("DataCamp is awesome!")[0])

# --- Example: find the article closest to a search term ---
search_text = "computer"
search_embedding = create_embeddings(search_text)[0]

distances = []
for article in articles:
    dist = distance.cosine(search_embedding, article["embedding"])
    distances.append(dist)

min_dist_ind = np.argmin(distances)
print(articles[min_dist_ind]['headline'])


# ============================================================
# CHAPTER 2 — Semantic Search, Recommendations, Classification
# ============================================================

# --- Enriched embeddings: articles with extra structured fields ---
articles = [
    {"headline": "Economic Growth Continues Amid Global Uncertainty",
     "topic": "Business",
     "keywords": ["economy", "business", "finance"]},
    # ...
    {"headline": "1.5 Billion Tune-in to the World Cup Final",
     "topic": "Sport",
     "keywords": ["soccer", "world cup", "tv"]}
]

# --- Combining multiple fields into one embeddable text (f-strings) ---
def create_article_text(article):
    return f"""Headline: {article['headline']}
Topic: {article['topic']}
Keywords: {','.join(article['keywords'])}"""

print(create_article_text(articles[-1]))

# --- Creating enriched embeddings from the combined text ---
article_texts = [create_article_text(article) for article in articles]
article_embeddings = create_embeddings(article_texts)
print(article_embeddings)

# --- find_n_closest(): general-purpose top-N nearest neighbor search ---
from scipy.spatial import distance

def find_n_closest(query_vector, embeddings, n=3):
    distances = []
    for index, embedding in enumerate(embeddings):
        dist = distance.cosine(query_vector, embedding)
        distances.append({"distance": dist, "index": index})
    distances_sorted = sorted(distances, key=lambda x: x["distance"])
    return distances_sorted[0:n]

# --- Semantic search: return top hits for a query ---
query_text = "AI"
query_vector = create_embeddings(query_text)[0]

hits = find_n_closest(query_vector, article_embeddings)

for hit in hits:
    article = articles[hit['index']]
    print(article['headline'])

# ------------------ Recommendation systems ------------------

# --- The article a user is currently reading ---
current_article = {"headline": "How NVIDIA GPUs Could Decide Who Wins the AI Race",
                    "topic": "Tech",
                    "keywords": ["ai", "business", "computers"]}

def create_article_text(article):
    return f"""Headline: {article['headline']}
Topic: {article['topic']}
Keywords: {','.join(article['keywords'])}"""

article_texts = [create_article_text(article) for article in articles]
current_article_text = create_article_text(current_article)
print(current_article_text)

# --- Creating embeddings for current article + candidate articles ---
current_article_embeddings = create_embeddings(current_article_text)[0]
article_embeddings = create_embeddings(article_texts)

# --- Finding the most similar article to recommend ---
hits = find_n_closest(current_article_embeddings, article_embeddings)

for hit in hits:
    article = articles[hit['index']]
    print(article['headline'])

# --- Recommendations based on multiple data points (reading history) ---
user_history = [
    {"headline": "How NVIDIA GPUs Could Decide Who Wins the AI Race",
     "topic": "Tech",
     "keywords": ["ai", "business", "computers"]},
    {"headline": "Tech Giant Buys 49% Stake In AI Startup",
     "topic": "Tech",
     "keywords": ["business", "AI"]}
]

history_texts = [create_article_text(article) for article in user_history]
history_embeddings = create_embeddings(history_texts)
mean_history_embeddings = np.mean(history_embeddings, axis=0)  # combine vectors via mean

articles_filtered = [article for article in articles if article not in user_history]
article_texts = [create_article_text(article) for article in articles_filtered]
article_embeddings = create_embeddings(article_texts)

hits = find_n_closest(mean_history_embeddings, article_embeddings)

for hit in hits:
    article = articles_filtered[hit['index']]
    print(article['headline'])

# ------------------ Classification (zero-shot) ------------------

# --- Step 1: embed class descriptions (labels only) ---
topics = [
    {'label': 'Tech'},
    {'label': 'Science'},
    {'label': 'Sport'},
    {'label': 'Business'},
]

class_descriptions = [topic['label'] for topic in topics]
class_embeddings = create_embeddings(class_descriptions)

# --- Step 2: embed the item to classify ---
article = {"headline": "How NVIDIA GPUs Could Decide Who Wins the AI Race",
           "keywords": ["ai", "business", "computers"]}

def create_article_text(article):
    return f"""Headline: {article['headline']}
Keywords: {','.join(article['keywords'])}"""

article_text = create_article_text(article)
article_embeddings = create_embeddings(article_text)[0]

# --- Step 3: compute cosine distances to each class ---
def find_closest(query_vector, embeddings):
    distances = []
    for index, embedding in enumerate(embeddings):
        dist = distance.cosine(query_vector, embedding)
        distances.append({"distance": dist, "index": index})
    return min(distances, key=lambda x: x["distance"])

closest = find_closest(article_embeddings, class_embeddings)

# --- Step 4: extract the most similar label ---
label = topics[closest['index']]['label']
print(label)  # e.g. "Business" — bare labels lack detail, can misclassify

# --- Improving accuracy with more detailed class descriptions ---
topics = [
    {'label': 'Tech', 'description': 'A news article about technology'},
    {'label': 'Science', 'description': 'A news article about science'},
    {'label': 'Sport', 'description': 'A news article about sports'},
    {'label': 'Business', 'description': 'A news article about business'},
]

class_descriptions = [topic['description'] for topic in topics]
class_embeddings = create_embeddings(class_descriptions)
# ... (embed article, find_closest as before) ...
label = topics[closest['index']]['label']
print(label)  # "Tech" — correct with richer descriptions


# ============================================================
# CHAPTER 3 — Vector Databases with ChromaDB
# ============================================================

# --- Connecting to a persistent local database ---
import chromadb

client = chromadb.PersistentClient(path="/path/to/save/to")

# --- Creating a collection with an OpenAI embedding function ---
from chromadb.utils.embedding_functions import OpenAIEmbeddingFunction

collection = client.create_collection(
    name="my_collection",
    embedding_function=OpenAIEmbeddingFunction(
        model_name="text-embedding-3-small",
        api_key="..."
    )
)

# --- Listing collections ---
client.list_collections()

# --- Inserting documents (Chroma embeds them automatically) ---
collection.add(ids=["my-doc"], documents=["This is the source text"])

collection.add(
    ids=["my-doc-1", "my-doc-2"],
    documents=["This is document 1", "This is document 2"]
)

# --- Inspecting a collection ---
collection.count()
collection.peek()  # first 10 items

# --- Retrieving specific items by id ---
collection.get(ids=["s59"])

# --- Estimating embedding cost before a big batch ---
# cost = 0.00002 * len(tokens) / 1000   (for text-embedding-3-small)
import tiktoken

enc = tiktoken.encoding_for_model("text-embedding-3-small")

total_tokens = sum(len(enc.encode(text)) for text in documents)
cost_per_1k_tokens = 0.00002

print('Total tokens:', total_tokens)
print('Cost:', cost_per_1k_tokens * total_tokens / 1000)

# --- Retrieving an existing collection (must match embedding function used to create it) ---
collection = client.get_collection(
    name="netflix_titles",
    embedding_function=OpenAIEmbeddingFunction(api_key="...")
)

# --- Querying by semantic similarity ---
result = collection.query(
    query_texts=["movies where people sing a lot"],
    n_results=3
)
print(result)

# --- Querying with multiple reference texts at once ---
reference_ids = ['s8170', 's8103']
reference_texts = collection.get(ids=reference_ids)["documents"]

result = collection.query(
    query_texts=reference_texts,
    n_results=3
)

# --- Adding metadata to existing items (from a CSV) ---
import csv

ids = []
metadatas = []

with open('netflix_titles.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for i, row in enumerate(reader):
        ids.append(row['show_id'])
        metadatas.append({
            "type": row['type'],
            "release_year": int(row['release_year'])
        })

# --- Updating items with metadata, then filtering queries with `where` ---
collection.update(ids=ids, metadatas=metadatas)

result = collection.query(
    query_texts=reference_texts,
    n_results=3,
    where={
        "type": "Movie"
    }
)
# where={"type": "Movie"} is shorthand for where={"type": {"$eq": "Movie"}}

# --- Where operators ---
# $eq  - equal to (string, int, float)
# $ne  - not equal to (string, int, float)
# $gt  - greater than (int, float)
# $gte - greater than or equal to (int, float)
# $lt  - less than (int, float)
# $lte - less than or equal to (int, float)

# --- Combining multiple where filters with $and / $or ---
where = {
    "$and": [
        {"type": {"$eq": "Movie"}},
        {"release_year": {"$gt": 2020}}
    ]
}
# $or: filter based on at least one condition being true

# --- Updating documents/embeddings directly ---
collection.update(
    ids=["id-1", "id-2"],
    documents=["New document 1", "New document 2"]
)
# Include only the fields to update — other fields will be unchanged
# Collection will automatically create new embeddings

# --- Upserting: insert if missing, update if present ---
collection.upsert(
    ids=["id-1", "id-2"],
    documents=["New document 1", "New document 2"]
)

# --- Deleting items or wiping the whole database ---
collection.delete(ids=["id-1", "id-2"])
client.reset()  # WARNING: deletes everything in the database