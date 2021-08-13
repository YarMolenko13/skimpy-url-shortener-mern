
class Validator {
    validateForm (form) {
        try {
            this.validateName(form.name.trim())
            this.validateEmail(form.email.trim())
            this.validatePassword(form.password.trim())
            return null
        } catch (e) {
            return e.message
        }
    }
    validateCreateLinkForm (form) {
        try {
            this.validateTitle(form.title)
            this.validateFullUrl(form.fullUrl)
            return null
        } catch (e) {
            return e.message
        }
    }

    validateName (name) {
        if (this.isStringIncludeAt(name) || this.isStringIncludeUnacceptableCharacters(name)) {
            throw new Error('Name should not contain special characters')
        }
        if (!this.lengthTest(name, 3, 50)) {
            throw new Error('Name should contain 3 or more characters')
        }
    }
    validateEmail (email) {
        if (!this.isStringIncludeAt(email) || !this.lengthTest(email, 6)) {
            throw new Error('Email address is invalid')
        }
    }
    validatePassword (password) {
        let reg = /\d+/
        if (!reg.test(password)) {
            throw new Error('Password is invalid')
        }
    }
    validateTitle (title) {
        if (this.isStringIncludeAt(title) || this.isStringIncludeUnacceptableCharacters(title)) {
            throw new Error('Title should not contain special characters')
        }
        if (!this.lengthTest(title, 3, 50)) {
            throw new Error('Title should contain 3 or more characters')
        }
    }
    validateFullUrl (url) {
        if (!url.split('//')[0].includes('http')) {
            throw new Error('Bad url')
        }
    }

     isStringIncludeUnacceptableCharacters (string) {
        return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(string);
    }
    isStringIncludeAt (string) {
        return /@/g.test(string)
    }
    lengthTest (string, min=0, max=70) {
        return string.length <= max && string.length >= min
    }
}

export default new Validator()

