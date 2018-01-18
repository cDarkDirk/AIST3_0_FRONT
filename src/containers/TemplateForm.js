import {connect} from 'react-redux'
import TemplateForm from '../components/TemplateForm'
import {fetchDataTemplatesList} from '../api'

function mapStateToProps(state, ownProps) {
    return {
        dataTemplates: state.dataTemplate.dataTemplates
    }
}

function mapDispatchToProps(dispatch) {
    return {
       // onFormInputChange: (value, paramName, formName) => dispatch(onFormInputChange(value, paramName, formName)),
        fetchDataTemplatesList: () => dispatch(fetchDataTemplatesList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateForm)
