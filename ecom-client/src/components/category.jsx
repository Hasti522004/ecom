import axios from "axios";
import React, { useEffect, useState } from "react";

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState({
        id: null,
        category_name: "",
        category_description: ""
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const fetchAllCategories = () => {
        axios
            .get("http://localhost:3001/category")
            .then((res) => {
                setCategories(res.data.data);
                setError(null); // Clear error if request succeeds
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
                setError("Error fetching categories. Please try again."); // Set error message
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.id) {
            // Edit existing category
            axios
                .put(`http://localhost:3001/category/update/${data.id}`, data)
                .then((res) => {
                    fetchAllCategories();
                    setData({
                        id: null,
                        category_name: "",
                        category_description: ""
                    });
                    setError(null); // Clear error if request succeeds
                })
                .catch((err) => {
                    console.error('Error updating category:', err);
                    setError("Error updating category. Please try again."); // Set error message
                });
        } else {
            // Add new category
            axios
                .post("http://localhost:3001/category", data)
                .then((res) => {
                    fetchAllCategories();
                    setData({
                        id: null,
                        category_name: "",
                        category_description: ""
                    });
                    setError(null); // Clear error if request succeeds
                })
                .catch((err) => {
                    console.error('Error adding category:', err);
                    setError("Error adding category. Please try again."); // Set error message
                });
        }
    };

    const handleEdit = (id) => {
        const categoryToEdit = categories.find((category) => category.id === id);
        if (categoryToEdit) {
            setData({
                id: categoryToEdit.id,
                category_name: categoryToEdit.category_name,
                category_description: categoryToEdit.category_description
            });
        } else {
            console.log("Category not found");
        }
    };

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3001/category/del/${id}`)
            .then((res) => {
                setCategories(categories.filter((category) => category.id !== id));
                setError(null); // Clear error if request succeeds
            })
            .catch((err) => {
                console.error('Error deleting category:', err);
                setError("Error deleting category. Please try again."); // Set error message
            });
    };

    return (
        <>
            <div>Category</div>
            {error && <div>Error: {error}</div>} {/* Display error message if error exists */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="category_name"
                    placeholder="Enter Category Name"
                    value={data.category_name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="category_description"
                    placeholder="Enter Category Description"
                    value={data.category_description}
                    onChange={handleChange}
                />
                <button type="submit">{data.id ? "Update" : "Add"}</button>
            </form>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Sr</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id}>
                                <td>{index + 1}</td>
                                <td>{category.category_name}</td>
                                <td>{category.category_description}</td>
                                <td>{category.category_status ? "Active" : "Inactive"}</td>
                                <td>
                                    <button onClick={() => handleEdit(category.id)}>Edit</button>
                                    <button onClick={() => handleDelete(category.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CategoryPage;
