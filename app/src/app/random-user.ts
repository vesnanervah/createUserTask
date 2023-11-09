type RandomUser = {
    results : [
        {
            name: {
                first: string,
                last: string
            },
            picture: {
                large: string
            }
        }
    ]
};

export { RandomUser };