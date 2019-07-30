import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

import CategoryForm from 'src/components/CategoryForm/CategoryForm';
import * as API from 'src/utils/API';
import config from 'src/config';

class Category extends Component {
  constructor(props) {
    super(props);

    this.validateForm = this.validateForm.bind(this);
    this.shouldDisableAddSubBtn = this.shouldDisableAddSubBtn.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIconsChange = this.handleIconsChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleSubCategoryAdd = this.handleSubCategoryAdd.bind(this);
    this.handleSubCategoryChange = this.handleSubCategoryChange.bind(this);
    this.handleSubCategoryDelete = this.handleSubCategoryDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      categoryId: null,
      categoryName: '',
      isExpense: true,
      iconId: '',
      subCategories: [],
      otherError: '',
      isEditMode: null,
      isDeleting: null,
      isLoading: null,
    };
  }

  async componentDidMount() {
    if (this.props.isEditMode) {
      try {
        const category = await API.getCategory(this.props.match.params.id);
        const { categoryId, categoryName, isExpense, iconId, subCategories } = category;
        this.setState({
          categoryId,
          categoryName,
          isExpense,
          iconId,
          subCategories,
        });
      } catch (e) {
        this.setState({ otherError: e });
      }
    }
  }

  validateForm() {
    if (!this.state.categoryName || this.state.categoryName.length == 0)
      return false;
    if (this.state.subCategories.findIndex(sub => !sub.categoryName) > -1)
      return false;
    return true;
  }

  shouldDisableAddSubBtn() {
    if (
      this.state.subCategories.length >= config.subCategoryMax ||
      this.state.subCategories.findIndex(sub => !sub.categoryName) > -1
    )
      return true;
    return false;
  }

  handleIconsChange(event) {
    this.setState({
      iconId: event.target.id
    });
  }

  handleTypeChange(value) {
    this.setState({
      isExpense: value
    });
  }

  handleNameChange(event) {
    this.setState({
      categoryName: event.target.value
    });
  }

  handleSubCategoryAdd() {
    let newSub = {
      categoryId: Date.now(),
      categoryName: '',
    };
    this.setState({
      subCategories: [...this.state.subCategories, newSub]
    });
  }

  handleSubCategoryChange(event) {
    this.setState({
      subCategories: this.state.subCategories.map(sub => {
        if (!!sub.categoryId && sub.categoryId.toString() === event.target.id) {
          return {
            ...sub,
            categoryName: event.target.value
          };
        }
        return sub;
      })
    });
  }

  handleSubCategoryDelete(event) {
    event.preventDefault();
    let subId = event.target.attributes['data-category-id'].value;
    let subCategories = this.state.subCategories.filter(
      sub => sub.categoryId.toString() === subId
    );
    let subName = subCategories.length > 0 ? subCategories[0].categoryName : '';

    if (subName) {
      const confirmed = window.confirm(
        'Are you sure you want to delete this sub-category? Deleting sub-category also deletes related transactions.'
      );
      if (!confirmed) {
        return;
      }
    }

    this.setState({
      subCategories: this.state.subCategories.filter(
        sub => sub.categoryId != subId
      )
    });
  }

  handleCancel() {
    this.props.history.push('/categories');
  }

  async handleDelete() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this category? Deleting category also deletes related transactions.'
    );
    if (!confirmed) {
      return;
    }
    // TODO: wait for confirmation from server and redirect to category list if success
    await API.deleteCategory(this.state.categoryId);
    this.props.history.push('/categories');
  }


  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      if (!this.props.isEditMode) {
        await API.postCategory({
          categoryName: this.state.categoryName,
          isExpense: this.state.isExpense,
          iconId: this.state.iconId,
          subCategories: this.state.subCategories,
        });
      } else {
        await API.updateCategory({
          categoryId: this.state.categoryId,
          categoryName: this.state.categoryName,
          isExpense: this.state.isExpense,
          iconId: this.state.iconId,
          subCategories: this.state.subCategories,
        });
      }
      this.props.history.push('/categories');
    } catch (e) {
      this.setState({ otherError: e });
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="Category">
        {!!this.state.otherError && (
          <Alert onClose variant="danger">
            {this.state.otherError.message}
          </Alert>
        )}
        <CategoryForm
          validateForm={this.validateForm}
          shouldDisableAddSubBtn={this.shouldDisableAddSubBtn}
          handleNameChange={this.handleNameChange}
          handleIconsChange={this.handleIconsChange}
          handleTypeChange={this.handleTypeChange}
          handleSubCategoryAdd={this.handleSubCategoryAdd}
          handleSubCategoryChange={this.handleSubCategoryChange}
          handleSubCategoryDelete={this.handleSubCategoryDelete}
          handleSubmit={this.handleSubmit}
          handleCancel={this.handleCancel}
          handleDelete={this.handleDelete}

          categoryName={this.state.categoryName}
          iconId={this.state.iconId}
          subCategories={this.state.subCategories}
          isExpense={this.state.isExpense}
          isLoading={this.state.isLoading}
          isEditMode={this.props.isEditMode}
        />
      </div>
    );
  }
}

Category.propTypes = {
  isEditMode: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
};

export default Category;
