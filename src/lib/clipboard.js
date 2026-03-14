export const copyText = async (value) => {
    if(navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(value);
        return true;
    }
    else{
        try {
            const textarea = document.createElement("textarea");
            textarea.value = value;

            textarea.setAttribute("readonly", "");
            textarea.style.position = "fixed";
            textarea.style.left = "-9999px";
            textarea.style.top = "0";
            textarea.style.opacity = "0";

            document.body.appendChild(textarea);

            textarea.focus();
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);

            if(document.execCommand("copy")){
                document.body.removeChild(textarea);
                return true;
            }
            else{
                document.body.removeChild(textarea);
                return false;
            }
        }
        catch(error){
            return false;
        }
    }
}