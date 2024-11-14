import { Tabs } from "antd";
import TheatersList from "../Admin/TheatersList";
import Bookings from "./Bookings";

function Profile() {
    const tabItems = [
        {
            key: 1,
            label: "Theaters",
            children: <TheatersList />,
        },
        {
            key: 2,
            label: "Bookings",
            children: <Bookings />,
        },
    ];
    return (
        <>
            <Tabs items={tabItems} style={{ color: "white" }} />
        </>
    );
}

export default Profile;
