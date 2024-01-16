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

    document.documentElement.style.setProperty(
        "--rbc-toolbar-label-color",
        "white"
    );
    document.documentElement.style.setProperty("--rbc-header-color", "white");
    document.documentElement.style.setProperty(
        "--rbc-date-cell-color",
        "#e6e6e6"
    );
    document.documentElement.style.setProperty(
        "--rbc-off-range-bg-color",
        "#474b52"
    );
    document.documentElement.style.setProperty("--rbc-today-color", "#242629");
    document.documentElement.style.setProperty(
        "--rbc-btn-group-color",
        "#666B74"
    );
    document.documentElement.style.setProperty("--rbc-active-color", "#242629");
    document.documentElement.style.setProperty(
        "--rbc-btn-text-color",
        "#e6e6e6"
    );
    document.documentElement.style.setProperty(
        "--rbc-btn-hover-color",
        "#2f3237"
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
