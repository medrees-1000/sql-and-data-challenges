from typing import Annotated

from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field

app = FastAPI(title="Practice API")


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float = Field(gt=0)
    in_stock: bool = True


class ItemOut(Item):
    id: int


items_db: dict[int, Item] = {}
next_id = 1


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/items/")
async def list_items(
    q: Annotated[str | None, Query(max_length=50)] = None,
) -> list[ItemOut]:
    results = [ItemOut(id=item_id, **item.model_dump()) for item_id, item in items_db.items()]
    if q:
        results = [item for item in results if q.lower() in item.name.lower()]
    return results


@app.get("/items/{item_id}")
async def get_item(item_id: int) -> ItemOut:
    item = items_db.get(item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return ItemOut(id=item_id, **item.model_dump())


@app.post("/items/", status_code=201)
async def create_item(item: Item) -> ItemOut:
    global next_id
    item_id = next_id
    items_db[item_id] = item
    next_id += 1
    return ItemOut(id=item_id, **item.model_dump())


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item) -> ItemOut:
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    items_db[item_id] = item
    return ItemOut(id=item_id, **item.model_dump())


@app.delete("/items/{item_id}", status_code=204)
async def delete_item(item_id: int) -> None:
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    del items_db[item_id]
