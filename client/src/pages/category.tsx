import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FormSubmit, RootStore, ICategory } from "../TypeScript";

import {
  createCategory,
  updateCategory,
  deteteCategory,
} from "../redux/actions/categoryAction";

import NotFound from "../components/global/NotFound";

const Category = () => {
  const [name, setName] = useState("");
  const [edit, setEdit] = useState<ICategory | null>(null);

  const { authState, categories } = useSelector((state: RootStore) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (edit) setName(edit.name);
  }, [edit]);

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault();
    if (!authState.access_token || !name) return;

    if (edit) {
      if (edit.name === name) return;
      const data = { ...edit, name };
      dispatch(updateCategory(data, authState.access_token));
    } else {
      dispatch(createCategory(name, authState.access_token));
    }

    setName("");
    setEdit(null);
  };

  const hdlDel = (id: string) => {
    if (!authState.access_token) return;
    dispatch(deteteCategory(id, authState.access_token));
  };
  if (authState.user?.role !== "admin") return <NotFound />;
  return (
    <div className="category">
      <form onSubmit={handleSubmit}>
        <label htmlFor="category">Category</label>

        <div className="d-flex">
          {edit && (
            <i className="fas fa-times mx-2" onClick={() => setEdit(null)} />
          )}
          <input
            type="text"
            name="category"
            id="category"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit">{edit ? "Update" : "Create"}</button>
        </div>
      </form>

      <div>
        {categories &&
          categories.map((category) => (
            <div className="category_row" key={category._id}>
              <p className="m-0 text-capitalize">{category.name}</p>

              <div>
                <i
                  className="fas fa-edit mx-2"
                  onClick={() => setEdit(category)}
                />
                <i
                  className="fas fa-trash-alt"
                  onClick={() => hdlDel(category._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
