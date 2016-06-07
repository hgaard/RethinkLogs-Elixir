defmodule RethinkLogs.PageController do
  use RethinkLogs.Web, :controller
  import RethinkDB.Query, only: [table_create: 1, table: 2, table: 1, insert: 2]

  def init(conn, _params) do
      

      table("logs") |> insert(%{message: "oh no"}) |> RethinkLogs.Database.run
      table("logs") |> insert(%{message: "Elixir is great"}) |> RethinkLogs.Database.run

      text conn, "Logs added. Visit '/' to fetch log entries"
    end

    def index(conn, _params) do
      results = table("logs")
      |> RethinkLogs.Database.run
      |> IO.inspect

      json conn, results
  end
end
