import React, { Component } from 'react';
import {
  Accordion,
  Alert,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  ListGroup,
  Tab,
  Tabs,
  Button,
  ButtonGroup
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PropTypes from 'prop-types';

import * as API from 'src/utils/API';

class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isEditMode: false,
      otherError: '',
      expenseList: [],
      incomeList: [],
    };

    this.onToggleEditMode = this.onToggleEditMode.bind(this);
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const categories = await API.getCategories(true);
      const { expenseList, incomeList } = this.categorizeCategories(categories);
      this.setState({
        expenseList,
        incomeList
      });
    } catch (e) {
      this.setState({
        otherError: e
      });
    }

    this.setState({ isLoading: false });
  }

  /**
   * Categorize categories by their type (expense, income)
   *
   * @param {[]} categories
   * @returns
   * @memberof CategoryList
   */
  categorizeCategories(categories) {
    let expenseList = [];
    let incomeList = [];
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      if (category.isExpense)
        expenseList.push(category);
      else
        incomeList.push(category);
    }
    return {
      expenseList,
      incomeList
    };
  }

  onToggleEditMode(values) {
    let isEditMode = values && !!values.length;
    this.setState({ isEditMode });
  }

  renderDefault() {
    return <h2>Category List</h2>;
  }

  renderCategoriesList(categoryList, isExpense) {
    let eventKey = isExpense ? 'expense' : 'income';
    let title = isExpense ? 'Expense' : 'Income';
    let cls = isExpense ? 'expense-list' : 'income-list';
    return (
      <Tab eventKey={eventKey} title={title} className={cls}>
        <Accordion>
          {categoryList.map((category, idx) => {
            let header = category.categoryName.trim();
            if (category.isDefault) {
              header = header.concat(' ⭐️');
            }
            let subCategories = category.subCategories;
            return (
              <Card
                key={category.categoryId}
                className="category-item"
                data-icon={category.iconId}
              >
                {this.state.isEditMode ? (
                  <LinkContainer
                    key={idx}
                    to={`/categories/${category.categoryId}`}
                    className="category-item__toggle"
                    data-icon={category.iconId}
                  >
                    <div>{header}</div>
                  </LinkContainer>
                ) : (
                  <div>
                    <Accordion.Toggle
                      eventKey={idx}
                      className="category-item__toggle"
                    >
                      {header}
                    </Accordion.Toggle>
                    <Accordion.Collapse
                      eventKey={idx}
                      className="category-item__collapse"
                    >
                      <div>
                        {!!subCategories &&
                          subCategories.map((sub, idx2) => {
                            return (
                              <Card.Body
                                key={idx2}
                                className="category-item__sub"
                              >
                                {sub.categoryName}
                              </Card.Body>
                            );
                          })}
                      </div>
                    </Accordion.Collapse>
                  </div>
                )}
              </Card>
            );
          })}
        </Accordion>
      </Tab>
    );
  }

  renderCategories() {
    return (
      <div className="categories">
        <div className="page-header">
          <h1>
            Categories
            <ButtonGroup>
              <Button
                as={LinkContainer}
                disabled={this.state.isEditMode}
                key="new"
                to="/categories/new"
                className="add-btn"
                variant="dark"
              >
                <button>＋</button>
              </Button>
              <ToggleButtonGroup
                onChange={this.onToggleEditMode}
                type="checkbox"
                className="edit-btn"
              >
                <ToggleButton
                  className="edit-btn"
                  value={1}
                  variant="dark">
                  <i className="material-icons">edit</i>
                </ToggleButton>
              </ToggleButtonGroup>
            </ButtonGroup>
          </h1>
        </div>
        {!!this.state.otherError && (
          <Alert onClose variant="danger">
            {this.state.otherError}
          </Alert>
        )}
        <ListGroup className="category-list">
          {!this.state.isLoading && (
            <Tabs defaultActiveKey="expense" id="uncontrolled-tab-example">
              {this.renderCategoriesList(this.state.expenseList, true)}
              {this.renderCategoriesList(this.state.incomeList, false)}
            </Tabs>
          )}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="CategoryList">
        {this.props.isAuthenticated
          ? this.renderCategories()
          : this.renderDefault()}
      </div>
    );
  }
}

CategoryList.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default CategoryList;
