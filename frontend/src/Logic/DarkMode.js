const DarkMode = () => {
    document.documentElement.style.setProperty("--underline-color", "white");

    document.documentElement.style.setProperty(
        "--scrollbar-track-color",
        "#4D4D4D"
    );
    document.documentElement.style.setProperty(
        "--scrollbar-thumb-color",
        "gray"
    );
    document.documentElement.style.setProperty(
        "--scrollbar-thumb-hover-color",
        "gainsboro"
    );
    document.documentElement.style.setProperty(
        "--scrollbar-button-color",
        "#36393e"
    );

    document.documentElement.style.setProperty("--fc-toolbar-title", "white");
    document.documentElement.style.setProperty(
        "--fc-col-header-cell-cushion",
        "white"
    );
    document.documentElement.style.setProperty(
        "--fc-daygrid-day-number",
        "white"
    );
    document.documentElement.style.setProperty(
        "--fc-multimonth-title",
        "white"
    );
    document.documentElement.style.setProperty(
        "--fc-scrollgrid-shrink-cushion",
        "white"
    );
    document.documentElement.style.setProperty(
        "--fc-list-day-side-text",
        "black"
    );
    document.documentElement.style.setProperty("--fc-list-day-text", "black");
    document.documentElement.style.setProperty(
        "--fc-button-background",
        "#1e1e1e"
    );
    document.documentElement.style.setProperty(
        "--fc-button-active-background",
        "#696969"
    );
    document.documentElement.style.setProperty("--fc-button-color", "white");
    document.documentElement.style.setProperty(
        "--fc-daygrid-day-frame",
        "#36393e"
    );
    document.documentElement.style.setProperty(
        "--fc-timegrid-axis-color",
        "#36393e"
    );
    document.documentElement.style.setProperty(
        "--fc-list-day-cushion",
        "#606060"
    );
    document.documentElement.style.setProperty(
        "--fc-list-event-title-and-time",
        "#36383e"
    );
    document.documentElement.style.setProperty("--fc-text", "white");
    document.documentElement.style.setProperty(
        "--fc-scrollgrid-sync-inner",
        "gray"
    );

    document.documentElement.style.setProperty("--datepicker-color", "#666B74");

    document.documentElement.style.setProperty(
        "--toggle-first-color",
        "#1d2349"
    );
    document.documentElement.style.setProperty(
        "--toggle-last-color",
        "#0e1225"
    );

    document.documentElement.style.setProperty("--inputColor", "gray");

    document.documentElement.style.setProperty("--input-upload-color", "#666");
};

export default DarkMode;
