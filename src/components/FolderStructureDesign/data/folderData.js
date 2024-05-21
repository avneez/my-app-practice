const explorer = {
    name: "root",
    isFolder: true,
    data: [
        {
            name: "public",
            isFolder: true,
            data: [
                {
                    name: "public_nested_1",
                    isFolder: true,
                    data: [
                        { name: "index.html", isFolder: false },
                        { name: "avneez.html", isFolder: false },
                    ]
                },
                {
                    name: "public_nested_2",
                    isFolder: false
                }
            ]
        },
        {
            name: "src",
            isFolder: true,
            data: [
                {
                    name: "components",
                    isFolder: true,
                    data: [
                        { name: "myComp.jsx", isFolder: false },
                    ]
                },
                {
                    name: "App.jsx",
                    isFolder: false,
                },
                {
                    name: "styles.css",
                    isFolder: false,
                },
                {
                    name: "index.js",
                    isFolder: false,
                }
            ]
        },
        {
            name: "package.json",
            isFolder: false,
        },
    ]
}

export default explorer