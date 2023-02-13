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
      totalPages: 1000,
      author: "Stephen King",
      summary: "It is a very intense book",
    });
    expect(result).toEqual({
      id: 1,
      title: "The Stand",
      totalPages: 1000,
      author: "Stephen King",
      summary: "It is a very intense book",
    });
  });
});
