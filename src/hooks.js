export const reroute = ({ url }) => {
    const { pathname } = url;

    if(pathname.startsWith("/manager")){
        return "/manager";
    }
    else{
        return pathname;
    }
}