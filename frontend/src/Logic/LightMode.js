const LightMode = () => {
    document.documentElement.style.setProperty("--underline-color", "black");

    document.documentElement.style.setProperty(
        "--scrollbar-track-color",
        "#D3D3D3"
    );
    document.documentElement.style.setProperty(
        "--scrollbar-thumb-color",
        "#0d6efd"
    );
    document.documentElement.style.setProperty(
        "--scrollbar-thumb-hover-color",
        "#7c95eb"
    );
    document.documentElement.style.setProperty(
        "--scrollbar-button-color",
        "white"
    );

    document.documentElement.style.setProperty(
        "--rbc-toolbar-label-color",
        "black"
    );
    document.documentElement.style.setProperty("--rbc-header-color", "black");
    document.documentElement.style.setProperty(
        "--rbc-date-cell-color",
        "black"
    );
    document.documentElement.style.setProperty(
        "--rbc-off-range-bg-color",
        "#e4e5e7"
    );
    document.documentElement.style.setProperty("--rbc-today-color", "#c8cbd0");
    document.documentElement.style.setProperty(
        "--rbc-btn-group-color",
        "white"
    );
    document.documentElement.style.setProperty("--rbc-active-color", "#e4e5e7");
    document.documentElement.style.setProperty("--rbc-btn-text-color", "black");
    document.documentElement.style.setProperty(
        "--rbc-btn-hover-color",
        "#f1f2f3"
    );

    document.documentElement.style.setProperty("--datepicker-color", "white");

    document.documentElement.style.setProperty(
        "--toggle-first-color",
        "#5c6bc0"
    );
    document.documentElement.style.setProperty(
        "--toggle-last-color",
        "#4758b8"
    );

    document.documentElement.style.setProperty("--inputColor", "");

    document.documentElement.style.setProperty(
        "--input-upload-color",
        "#f2f2f2"
    );
};

export default LightMode;
