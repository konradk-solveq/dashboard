import { AvailableLanguages } from "../components/typings/PublicationSection"

export const sortLanguages = (languageArray: Array<AvailableLanguages>): Array<AvailableLanguages> => languageArray?.sort((language) => (language.name === 'pl' ? -1 : 1))