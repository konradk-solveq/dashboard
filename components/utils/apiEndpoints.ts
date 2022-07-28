const API_PATH = '/api'
const PUBLICATIONS_PATH = `${API_PATH}/publications`

const endpoints = {
    policy: `${PUBLICATIONS_PATH}/manage/documents?type=policy`,
    terms: `${PUBLICATIONS_PATH}/manage/documents?type=terms`,
    publications: `${PUBLICATIONS_PATH}/manage`
}

export default endpoints
