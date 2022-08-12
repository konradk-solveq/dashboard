const API_PATH = '/api'
const PUBLICATIONS_PATH = `${API_PATH}/publications`
const NOTIFICATIONS_PATH = `${API_PATH}/notifications`
const APPLICATION_PATH = `${API_PATH}/application`

const endpoints = {
    policy: `${PUBLICATIONS_PATH}/manage/documents?type=policy`,
    terms: `${PUBLICATIONS_PATH}/manage/documents?type=terms`,
    publications: `${PUBLICATIONS_PATH}/manage`,
    documents: `${PUBLICATIONS_PATH}/manage/documents`,
    notifications: `${NOTIFICATIONS_PATH}/manage`,
    config: `${APPLICATION_PATH}/config`,
    languages: `${APPLICATION_PATH}/languages/manage`,
    uiTranslation: `${APPLICATION_PATH}/ui-translation/manage`,
}

export default endpoints
