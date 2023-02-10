import Client from "../database";

export type Book = {
  id: number;
  title: string;
  author: string;
  totalPages: number;
  summary: string;
};

export class BookStore {
  async index(): Promise<Book[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM books";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`);
    }
  }

  //return value not an array since we want a single entry to display
  async show(id: string): Promise<Book> {
    try {
      //$1 is a placeholder for the value provided from show
      const sql = "SELECT * FROM books WHERE id=($1)";

      const conn = await Client.connect();
      //the value is passed from id to the sql query in square brackets in the query method
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`);
    }
  }
  //can use the book type for create instead of typing out all the single values
  async create(b: Book): Promise<Book> {
    try {
      //same procedure here: $1... is placeholder for the incoming values
      const sql =
        "INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *";

      const conn = await Client.connect();
      //and they are being passed here as an array in the query method
      const result = await conn.query(sql, [
        b.title,
        b.author,
        b.totalPages,
        b.summary,
      ]);
//return a specific row
      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not add new book ${b.title}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<Book> {
    try {
      const sql = "DELETE FROM books WHERE id=($1)";

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete book ${id}. Error: ${err}`);
    }
  }
}
