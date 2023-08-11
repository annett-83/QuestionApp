export function transformAxiosError(e) {
    if (e.response && e.response.data && e.response.data.error) {
        return {error: e.response.data.error};
    }
    if (e.code && e.message) {
        return { error: { code: e.code, message: e.message } };
    }
    console.log("Fatal Error in transformAxiosError ", e);
}
