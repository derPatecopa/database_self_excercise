import Client from "../database";

const defaultBook: Book = {
  id: 0,
  title: "",
  author: "",
  totalpages: 0,
  summary: "",
};

export type Book = {
  id?: number;
  title: string;
  author: string;
  totalpages: number;
  summary: string;
};

export class BookStore {
  async index(): Promise<Book[]> {
    if (Client) {
      try {
        const conn = await Client.connect();
        const sql = "SELECT * FROM books";

        const result = await conn.query(sql);

        conn.release();

        return result.rows;
      } catch (err) {
        throw new Error(`Could not get books. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return [];
    }
  }

  //return value not an array since we want a single entry to display
  async show(id: string): Promise<Book> {
    if (Client) {
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
    } else {
      console.log("Client is falsy");
      return defaultBook;
    }
  }
  //can use the book type for create instead of typing out all the single values
  async create(b: Book): Promise<Book> {
    if (Client) {
      try {
        //same procedure here: $1... is placeholder for the incoming values
        const sql =
          "INSERT INTO books (title, author, totalPages, summary) VALUES($1, $2, $3, $4) RETURNING *";

        const conn = await Client.connect();
        //and they are being passed here as an array in the query method
        const result = await conn.query(sql, [
          b.title,
          b.author,
          b.totalpages,
          b.summary,
        ]);
        //return a specific row
        const book = result.rows[0];

        conn.release();

        return book;
      } catch (err) {
        throw new Error(`Could not add new book ${b.title}. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return defaultBook;
    }
  }

  async delete(id: string): Promise<Book> {
    if (Client) {
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
    } else {
      console.log("Client is falsy");
      return defaultBook;
    }
  }
}

