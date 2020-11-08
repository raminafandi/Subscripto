import validation from '../constants/validation'
export default function validateForm(fieldName, value) {
    if(value == undefined || value == ""){
        return validation[fieldName].presence.message
    }

    if(fieldName == 'amount'){
        value = value.replace(/,/g,".")
        let count
        if(value.match(/\./g) == null)
            count = 0
        else
            count = (value.match(/\./g)).length;
        if(count > 1)
            return validation[fieldName].other.message
        if(value.length == 1 && count == 1){
            return validation[fieldName].other.message
        }
    }

    return false
}