# def add_item(item, my_list=[]):
#     my_list.append(item)
#     return my_list

# print(add_item("apple"))
# print(add_item("banana"))



nums = [10, 11, 20, 21, 30]
grouped = {}

for num in nums:
    tens_digit = num // 10
    
    grouped.setdefault(tens_digit, []).append(num)
    
print(grouped)

words = ["cat", "car", "dog"]
grouped = {}

for word in words:
    first_letter = word[0]
    # If first_letter isn't in dict, set it to [] and immediately append the word
    grouped.setdefault(first_letter, []).append(word)

print(grouped)  # Output: {'c': ['cat', 'car'], 'd': ['dog']}





scores = {"alice": 40, "bob": 75, "charlie": 50}

for score in scores.copy():
    if scores[score] < 60:
        del scores[score]
        
print(scores)