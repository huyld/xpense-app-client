import React, { Component } from 'react';
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  FormCheck,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import LoaderButton from 'src/components/LoaderButton/LoaderButton';
import config from 'src/config';

class CategoryForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      validateForm,
      handleNameChange,
      handleIconsChange,
      handleTypeChange,
      handleSubCategoryChange,
      handleSubmit,
      categoryName,
      iconId,
      subCategories,
      isExpense,
      isLoading,
      isEditMode
    } = this.props;
    return (
      <form onSubmit={handleSubmit} className="category-form">
        <FormGroup controlId="categoryName">
          <FormLabel>Category name</FormLabel>
          <FormControl onChange={handleNameChange} value={categoryName} />
        </FormGroup>
        <FormGroup>
          <ToggleButtonGroup
            name="is-expense"
            onChange={handleTypeChange}
            type="radio"
            value={isExpense}
          >
            <ToggleButton
              className="type-btn"
              value={true}
              variant={isExpense ? 'danger' : 'outline-danger'}
            >
              Expense
            </ToggleButton>
            <ToggleButton
              className="type-btn"
              value={false}
              variant={isExpense ? 'outline-success' : 'success'}
            >
              Income
            </ToggleButton>
          </ToggleButtonGroup>
        </FormGroup>
        <FormGroup controlId="iconId">
          <FormLabel>Icon</FormLabel>
          <div className="icon-list">
            {config.icons.map(code => (
              <FormCheck
                inline
                type="radio"
                key={code}
                id={code}
                name="iconId"
                checked={iconId === code}
                label={<i className="material-icons">{code}</i>}
                onChange={handleIconsChange}
              />
            ))}
          </div>
        </FormGroup>
        <div className="sub-label">
          <FormLabel>Sub-categories</FormLabel>
          <Button
            variant="outline-primary"
            disabled={this.props.shouldDisableAddSubBtn()}
            onClick={this.props.handleSubCategoryAdd}
          >
            ＋
          </Button>
        </div>
        {subCategories.map((sub, idx) => {
          return (
            <FormGroup
              controlId={sub.categoryId}
              className="subcategory"
              key={idx}
            >
              <FormControl
                value={subCategories[idx].categoryName}
                onChange={handleSubCategoryChange}
              />
              <Button
                variant="danger"
                data-category-id={sub.categoryId}
                onClick={this.props.handleSubCategoryDelete}
                className="subcategory__del"
              >
                −
              </Button>
            </FormGroup>
          );
        })}
        <LoaderButton
          block
          variant="primary"
          size="lg"
          disabled={!validateForm()}
          type="submit"
          isLoading={isLoading}
          text={isEditMode ? 'Update' : 'Create'}
          loadingText={isEditMode ? 'Updating…' : 'Creating…'}
        />
        <Button
          block
          variant="secondary"
          size="lg"
          onClick={this.props.handleCancel}
        >
          Cancel
        </Button>
      </form>
    );
  }
}

CategoryForm.propTypes = {
  validateForm: PropTypes.func.isRequired,
  shouldDisableAddSubBtn: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
  handleIconsChange: PropTypes.func.isRequired,
  handleSubCategoryAdd: PropTypes.func.isRequired,
  handleSubCategoryChange: PropTypes.func.isRequired,
  handleSubCategoryDelete: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,

  categoryName: PropTypes.string,
  iconId: PropTypes.string,
  subCategories: PropTypes.array,
  isExpense: PropTypes.bool,
  isLoading: PropTypes.bool,
  isEditMode: PropTypes.bool,
};

export default CategoryForm;
