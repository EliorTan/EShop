const getError = (err) => {
    const message = (err.message && err.response.data.message ? err.response.data.message : err.message)
    return message
}

export {getError}