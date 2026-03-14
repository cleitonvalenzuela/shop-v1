export const clickout = (node, callback) => {
    const handleClick = (event) => {
        if (!node.contains(event.target)) {
            callback?.(event);
        }
    };

    document.addEventListener("click", handleClick, true);

    return {
        destroy() {
            document.removeEventListener("click", handleClick, true);
        }
    };
}