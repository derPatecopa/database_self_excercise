import { Book, BookStore } from "../models/book";

const store = new BookStore();

describe("Book Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  // it("should have a update method", () => {
  //   expect(store.update).toBeDefined();
  // });
  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a book", async () => {
    const result = await store.create({
      title: "The Stand",
      totalpages: 1000,
      author: "Stephen King",
      summary: "It is a very intense book",
    });
    //postgres saves descriptions for tables by default in all lowercase, so variables need to be written in lowercase or changed in the model file
    expect(result).toEqual({
      id: 1,
      title: "The Stand",
      totalpages: 1000,
      author: "Stephen King",
      summary: "It is a very intense book",
    });
  });
});
