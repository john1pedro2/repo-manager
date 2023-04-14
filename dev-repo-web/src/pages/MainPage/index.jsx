import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth";

import Nav from "./Nav";
import Search from "./Search";
import Repositories from "./Repositories";

import { getRepositories, createRepository, destroyRepository } from "../../services/api";

import "./styles.css"

const MainPage = () => {
  const context = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError]= useState(false);
  const navigate = useNavigate();

  const loadData = async ( query = '' ) => {
    try {
      if (!context.loading) {
        const response = await getRepositories(context.user?.id, query);
        setRepositories(response.data);
        setLoading(false);
      }
    } catch(err) {
      console.error(err);
      setLoadingError(true)
    }
  }

  useEffect(() => {
    (async () => await loadData())();
  }, [context]);

  const handleLogout = () => {
    context.logout();
    navigate('/login');
  }

  const handleSearch = async (query) => {
    await loadData(query);
  }

  const handleDeleteRepo = async (repository) => {
    console.log('delete item', repository);
    await destroyRepository(context.user?.id, repository._id);
    await loadData();
  }

  const handleNewRepo = async (url) => {
    try {
      await createRepository(context.user?.id, url)
      await loadData();
    } catch (err) {
      console.error(err);
      setLoadingError(true)
    }
  }

  if (loadingError) {
    return (
      <div className="loading">
        Error fetching data.
        <Link to="/login">Voltar</Link>
        <div className="current-user">{context.user?.id}</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="loading">
        Carregando...
      </div>
    )
  }

  return(
    <div id="main">

      <Nav onLogout={handleLogout} />
      <Search onSearch={handleSearch} onClearSearch={loadData}/>
      <Repositories 
      repositories={repositories}
      onDeleteRepo={handleDeleteRepo}
      onNewRepo={handleNewRepo}
      />

    </div>
  );
}

  export default MainPage;
