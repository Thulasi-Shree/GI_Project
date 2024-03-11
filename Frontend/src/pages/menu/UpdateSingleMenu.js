/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [dietaryPreferenceCategory, setDietaryPreferenceCategory] =
    useState('');
  const [mealTypeCategory, setMealTypeCategory] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurantBranch, setRestaurantBranch] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { id: productId } = useParams();

  const dietaryCategory = [
    'Vegetarian',
    'Non-vegetarian',
    'Vegan',
    'Gluten-Free',
    'Halal',
    'Other'
  ];
  const mealCategory = [
    'Appetizers',
    'Main Course',
    'Desserts',
    'Beverages',
    'Other'
  ];

  // const navigate = useNavigate();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const onIsAvailableChange = () => {
    setIsAvailable((prevIsAvailable) => !prevIsAvailable);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('isAvailable', isAvailable || false);
    formData.append('description', description);
    formData.append('restaurantId', restaurantId);
    formData.append('restaurantBranch', restaurantBranch);
    formData.append('mealTypeCategory', mealTypeCategory);
    formData.append('dietaryPreferenceCategory', dietaryPreferenceCategory);
    images.forEach((image) => {
      formData.append('images', image);
    });
    formData.append('imagesCleared', imagesCleared);

    try {
      // Use axios to send the form data
      await axios.put(`/api/admin/product/${productId}`, formData);

      alert('Product Updated Successfully!');

      setImages([]);
    } catch (error) {
      alert(error.message || 'An error occurred');
    }
  };

  const clearImagesHandler = () => {
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true);
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get(`/api/product/${productId}`);
        const product = response.data.menu;

        setName(product.name);
        setPrice(product.price);
        setIsAvailable(product.isAvailable);
        setDescription(product.description);
        setRestaurantId(product.restaurantId);
        setRestaurantBranch(product.restaurantBranch);
        setDietaryPreferenceCategory(product.dietaryPreferenceCategory);
        setMealTypeCategory(product.mealTypeCategory);

        const images = product.images.map((image) => image.image);
        setImagesPreview(images);
      } catch (error) {
        alert(error.message || 'An error occurred');
      }
    };

    getProductDetails();
  }, [productId]);

  return (
    <div className="CreateMenu py-1 text-white">
      <div className="container-fluid">
        <div className="row">
          {/* <div className=""> */}
          <div
            className="col-lg-8  mx-auto col-xs-12 col-md-10 my-5"
            id="CardText"
          >
            <form
              onSubmit={submitHandler}
              className="shadow-lg p-4"
              encType="multipart/form-data"
              id="CardBackIMg1"
            >
              <h1 className="mb-4">Update Product</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                  type="text"
                  id="name_field"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price_field">Price</label>
                <input
                  style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                  type="text"
                  id="price_field"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description_field">Description</label>
                <textarea
                  style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                  className="form-control"
                  id="description_field"
                  rows="8"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category_field">
                  Dietary Preference Category
                </label>
                <select
                  style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                  value={dietaryPreferenceCategory}
                  onChange={(e) => setDietaryPreferenceCategory(e.target.value)}
                  className="form-control"
                  id="category_field"
                >
                  <option value="">Select</option>
                  {dietaryCategory.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="category_field">Meal Type Category</label>
                <select
                  style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                  value={mealTypeCategory}
                  onChange={(e) => setDietaryPreferenceCategory(e.target.value)}
                  className="form-control"
                  id="category_field"
                >
                  <option value="">Select</option>
                  {mealCategory.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="stock_field">Is Available</label>
                <input
                  style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                  type="checkbox"
                  id="stock_field"
                  className="form-check-input"
                  onChange={onIsAvailableChange}
                  checked={isAvailable}
                />
              </div>

              <div className="form-group">
                <label htmlFor="seller_field">Restaurant Id</label>
                <input
                  style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                  type="text"
                  id="seller_field"
                  className="form-control"
                  readOnly
                  onChange={(e) => setRestaurantId(e.target.value)}
                  value={restaurantId}
                />
              </div>
              <div className="form-group">
                <label htmlFor="seller_field">Restaurant Branch</label>
                <input
                  style={{ backgroundColor: '#d4ffe8', color: 'black' }}
                  type="text"
                  id="seller_field"
                  className="form-control"
                  readOnly
                  onChange={(e) => setRestaurantBranch(e.target.value)}
                  value={restaurantBranch}
                />
              </div>

              <div className="form-group">
                <label>Images</label>

                <div className="custom-file">
                  <input
                    style={{
                      backgroundColor: 'transparent',
                      borderRadius: '30px'
                    }}
                    type="file"
                    name="product_images"
                    className="custom-file-input"
                    id="customFile"
                    multiple
                    onChange={onImagesChange}
                  />

                  <label className="custom-file-label " htmlFor="customFile">
                    Choose Images
                  </label>
                </div>

                {imagesPreview.length > 0 && (
                  <span
                    className="mr-2"
                    onClick={clearImagesHandler}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fa fa-trash" />
                  </span>
                )}
                {imagesPreview.map((image) => (
                  <img
                    className="mt-3 mr-2"
                    key={image}
                    src={image}
                    alt="Image Preview"
                    width="55"
                    height="52"
                  />
                ))}
              </div>

              <button
                id="login_button"
                type="submit"
                // className="btn btn-block py-3"
                className="my-global-button px-5 "
              >
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
