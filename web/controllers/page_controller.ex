defmodule RethinkLogs.PageController do
  use RethinkLogs.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
