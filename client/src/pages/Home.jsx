import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, Badge, Nav } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import FoodList from '../components/FoodList';
import AddFoodForm from '../components/AddFoodForm';

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inventory');
  const [userStats, setUserStats] = useState({
    itemsTracked: 0,
    expiringSoon: 0,
    savingsThisMonth: 0
  });


  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const styles = {
    header: {
      backgroundColor: '#FBE2B3',
      borderRadius: '10px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    logo: {
      color: '#FFA90D',
      fontWeight: 'bold'
    },
    card: {
      border: '1px solid #FDCC71',
      marginBottom: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)'
    },
    cardHeader: {
      backgroundColor: '#FBE2B3',
      color: '#333'
    },
    button: {
      backgroundColor: '#FFA90D',
      borderColor: '#FFA90D'
    },
    nav: {
      backgroundColor: '#FBE2B3',
      borderRadius: '8px',
      marginBottom: '20px'
    },
    navItem: {
      color: '#333',
      fontWeight: 'bold'
    },
    activeNavItem: {
      backgroundColor: '#FFA90D',
      color: 'white',
      borderRadius: '6px'
    },
    statCard: {
      backgroundColor: '#FDCC71',
      textAlign: 'center',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '20px'
    }
  };

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div style={styles.header} className="d-flex justify-content-between align-items-center">
            <div>
              <h1 style={styles.logo}>
                FridgeMate <i className="bi bi-refrigerator"></i>
              </h1>
              <p className="mb-0">Track your food, reduce waste, save money</p>
            </div>
            <Button 
              variant="outline-danger" 
              onClick={handleLogout}
              className="rounded-pill"
            >
              Logout
            </Button>
          </div>
        </Col>
      </Row>

      {/* Dashboard Stats */}
      <Row className="mb-4">
        <Col md={4}>
          <div style={styles.statCard}>
            <h2>{userStats.itemsTracked}</h2>
            <p className="mb-0">Items Tracked</p>
          </div>
        </Col>
        <Col md={4}>
          <div style={styles.statCard}>
            <h2>{userStats.expiringSoon}</h2>
            <p className="mb-0">Expiring Soon</p>
          </div>
        </Col>
        <Col md={4}>
          <div style={styles.statCard}>
            <h2>{userStats.savingsThisMonth}</h2>
            <p className="mb-0">Savings This Month</p>
          </div>
        </Col>
      </Row>

      {/* Navigation Tabs */}
      <Nav 
        variant="pills" 
        style={styles.nav}
        className="p-2"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
      >
        <Nav.Item>
          <Nav.Link 
            eventKey="inventory" 
            style={activeTab === 'inventory' ? styles.activeNavItem : styles.navItem}
          >
            Inventory
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            eventKey="add" 
            style={activeTab === 'add' ? styles.activeNavItem : styles.navItem}
          >
            Add Food
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            eventKey="scan" 
            style={activeTab === 'scan' ? styles.activeNavItem : styles.navItem}
          >
            Scan Barcode
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Content Area */}
      <Card style={styles.card}>
        <Card.Header style={styles.cardHeader}>
          {activeTab === 'inventory' && <h4>Your Food Inventory</h4>}
          {activeTab === 'add' && <h4>Add New Food Item</h4>}
          {activeTab === 'scan' && <h4>Scan Barcode</h4>}
        </Card.Header>
        <Card.Body>
          {activeTab === 'inventory' && <FoodList />}
          {activeTab === 'add' && <AddFoodForm />}
          {activeTab === 'scan' && <Scanner />}
        </Card.Body>
      </Card>

      {/* Tips & Help */}
      <Card style={styles.card}>
        <Card.Header style={styles.cardHeader}>
          <h4>Food Storage Tips</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <h5>Store Fruits Properly</h5>
                  <p>Keep most fruits in the refrigerator, but store bananas, apples, and tomatoes at room temperature.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <h5>Freeze Extras</h5>
                  <p>Most leftovers can be frozen! Use freezer-safe containers and label with dates.</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <h5>First In, First Out</h5>
                  <p>Place newer items behind older ones to ensure you use older products first.</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Home;
