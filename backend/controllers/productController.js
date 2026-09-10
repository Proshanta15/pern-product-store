import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
    try {
        const products = await sql `
        SELECT * FROM products
        ORDER BY created_at DESC
        `;
        res.status(200).json({success: true, data: products});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }

export const getProduct = async (req, res) => { }

export const createProduct = async (req, res) => { }

export const updateProduct = async (req, res) => { }

export const deleteProduct = async (req, res) => { }
