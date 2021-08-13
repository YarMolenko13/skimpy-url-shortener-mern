import {makeAutoObservable} from "mobx";

export class LinksStore {
    constructor() {
        this._links = {}
        this._isCreateModal = false
        this._indexOfActiveLink = 0
        this._activeLink = {}
        makeAutoObservable(this)
    }

    setLinks(value) {
        this._links = value
    }
    setIsCreateModal(value) {
        this._isCreateModal = value
    }
    setIndexOfActiveLink(linkI) {
        this._indexOfActiveLink = linkI
    }
    setActiveLink(value) {
        this._activeLink = value
    }

    get links() {
        return this._links
    }
    get isCreateModal() {
        return this._isCreateModal
    }
    get indexOfActiveLink() {
        return this._indexOfActiveLink
    }
    get activeLink() {
        if (this._activeLink.count() === 0) {
            return this._links[0]
        }
        return this._activeLink
    }
    // get checkedLinks() {
    //     return this._checkedLinks
    // }
    get checkedLinks() {
        let links = this.links
        let checked = []
        for (let key in links) {
            if (links[key].count() && links[key].isChecked === true) {
                checked.push(links[key])
            }
        }
        console.log(checked)
        return checked
    }
}