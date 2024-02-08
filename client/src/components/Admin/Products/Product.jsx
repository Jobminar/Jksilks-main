import React, { useState } from 'react';
import './Product.css'
import FreshVegetable from './tabs/Lightweight';
import Offers from './tabs/Purekanchi';
import Additionals from './tabs/Exclusive-Bridal-wear';
import Quickpicks from './tabs/Pure-kanjivaram';
import Leafyvegetables from './tabs/Softsilk';
import Adminheader from '../adminheader';
import Semikanchi from './tabs/Semikanchi';
import Lightweight from './tabs/Lightweight';
import Softsilk from './tabs/Softsilk';
import Purekanchi from './tabs/Purekanchi';
import Purekanjivaram from './tabs/Pure-kanjivaram';
import ExclusiveBridalwear from './tabs/Exclusive-Bridal-wear';
import Offerzone from './tabs/Offerzone';
import Newdrops from './tabs/Newdrops';




const Product = () => {
  const [activeTab, setActiveTab] = useState('semikanchi');

  const renderSelectedComponent = () => {
    switch (activeTab) {
      case 'semikanchi':
        return <Semikanchi/>
      case 'lightweight':
        return <Lightweight />;
      case 'softsilk':
        return <Softsilk />;
      case 'purekanchi':
        return <Purekanchi />;
      case 'purekanjivaram':
        return <Purekanjivaram />;
      case 'exclusivebridalwear':
        return <ExclusiveBridalwear />;
      case 'newdrops':
        return <Newdrops/>;
      case 'offerzone':
        return <Offerzone />;
      default:
        return null;
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div  className='services-container'>
     <Adminheader/>
      <div className="tabs-container">
        <div
          className={`tab ${activeTab === 'semikanchi' && 'active'}`}
          onClick={() => handleTabClick('semikanchi')}
        >
          {/* <img src={general} alt="" width={30}/> */}
          Semi Kanchi Pattu
        </div>
        <div
          className={`tab ${activeTab === 'lightweight' && 'active'}`}
          onClick={() => handleTabClick('lightweight')}
        >
          {/* <img src={denting} alt="" width={30}/> */}
          Light Weight Pattu
        </div>
        <div
          className={`tab ${activeTab === 'softsilk' && 'active'}`}
          onClick={() => handleTabClick('softsilk')}
        >
          {/* <img src={denting} alt="" width={30}/> */}
          Soft silk
        </div>
        <div
          className={`tab ${activeTab === 'purekanchi' && 'active'}`}
          onClick={() => handleTabClick('purekanchi')}
        >
          {/* <img src={ac} alt="" width={30}/> */}
          Pure Kanchi Pattu
        </div>
        <div
          className={`tab ${activeTab === 'purekanjivaram' && 'active'}`}
          onClick={() => handleTabClick('purekanjivaram')}
        >
          {/* <img src={accident} alt="" width={30}/> */}
          Pure kanjivaram silk
        </div>
        <div
          className={`tab ${activeTab === 'exclusivebridalwear' && 'active'}`}
          onClick={() => handleTabClick('exclusivebridalwear')}
        >
          {/* <img src={battery} alt="" width={30}/> */}
          Exclusive Bridal wear
        </div>
        <div
          className={`tab ${activeTab === 'newdrops' && 'active'}`}
          onClick={() => handleTabClick('newdrops')}
        >
          {/* <img src={battery} alt="" width={30}/> */}
          New Drops
        </div>
        <div
          className={`tab ${activeTab === 'offerzone' && 'active'}`}
          onClick={() => handleTabClick('offerzone')}
        >
          {/* <img src={battery} alt="" width={30}/> */}
          Offer Zone
        </div>
      </div>
      {renderSelectedComponent()}
    </div>
  );
};

export default Product;
