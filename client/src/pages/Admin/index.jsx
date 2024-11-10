import { Tabs } from "antd";
import MoviesList from "./MoviesList";
import TheatersList from "./TheatersLlist";

function Admin() {
    const tabItems = [
        {
            key: 1,
            label: "Movies",
            children: (
                <div>
                    <MoviesList />
                </div>
            ),
        },
        {
            key: 2,
            label: "Theaters",
            children: <TheatersList />,
        },
    ];
    return (
        <>
            <h1>Admin page</h1>
            <Tabs items={tabItems} style={{ color: "white" }} />
        </>
    );
}

export default Admin;
