const API_PATH = '/api'
const PUBLICATIONS_PATH = `${API_PATH}/publications`
const NOTIFICATIONS_PATH = `${API_PATH}/notifications`
const APPLICATION_PATH = `${API_PATH}/application`
const WEBHOOKS_PATH = `${API_PATH}/webhooks`
const APP_VERSION = `${API_PATH}/app-version`
const CYCLING_MAP = `${API_PATH}/cycling-map/manage`

const endpoints = {
    policy: `${PUBLICATIONS_PATH}/manage/documents?type=policy`,
    terms: `${PUBLICATIONS_PATH}/manage/documents?type=terms`,
    publications: `${PUBLICATIONS_PATH}/manage`,
    documents: `${PUBLICATIONS_PATH}/manage/documents`,
    notifications: `${NOTIFICATIONS_PATH}/manage`,
    config: `${APPLICATION_PATH}/config`,
    languages: `${APPLICATION_PATH}/languages/manage`,
    uiTranslation: `${APPLICATION_PATH}/ui-translation/manage`,
    webhooks: `${WEBHOOKS_PATH}/manage`,
    auth: `${WEBHOOKS_PATH}/manage/verification-method-list`,
    events: `${WEBHOOKS_PATH}/manage/event-list`,
    appVersion: `${APP_VERSION}/manage/`,
    cyclingMap: CYCLING_MAP,
    reports: `${API_PATH}/report`,
    routes: `${API_PATH}/routes/route`,
    settings: `${API_PATH}/settings`,
    featuredSections: `${API_PATH}/featured-sections`,
}

export default endpoints
