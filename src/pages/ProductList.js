import React, { useEffect, useState } from 'react'
import CostumerService from '../services/costumer'
import Layout from '../core/Layout'
import { useHistory } from 'react-router-dom'
import Alert from '../utils/Alert';
import MainLayout from '../core/MainLayout';

export default function ProductList({match}) {

    return (
        <MainLayout>
            <div className="mx-10">
                <Alert warn header="Bi' sorun var!" content="Yükleme işlemleri yapıldığından 7(Yedi) gün sonra hizmete açılacaktır."/> 
            </div>
        </MainLayout>
    )
}
