import validation from '../constants/validation'
export default function validateForm(fieldName, value) {
    if(value == undefined || value == ""){
        return validation[fieldName].presence.message
    }

    if(fieldName == 'amount'){
        let count = String(value).split('.').length
        if(count > 2)
            return validation[fieldName].other.message
    }

    return false
}