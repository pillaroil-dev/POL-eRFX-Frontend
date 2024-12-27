export const ReloadAfter = async (time: number) => {
    //time in milliseconds
    setTimeout(() => window.location.reload(), time);
}