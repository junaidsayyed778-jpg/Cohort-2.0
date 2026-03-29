import dotenv from "dotenv"
dotenv.config()
import {  PDFParse } from "pdf-parse";
import fs from "fs";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY})
const index = pc.index("rag")

//let dataBuffer = fs.readFileSync("./story.pdf")

//const parser = new PDFParse({data: dataBuffer})

//const data = await parser.getText()

const embedding = new MistralAIEmbeddings({
    apiKey: process.env.MISTRALAI_API_KEY,
    model: "mistral-embed"
})
/*
const spliters = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 0
})
    

const chunks = await spliters.splitText(data.text)
const docs = await Promise.all(chunks.map(async (chunks) =>{
    return {
        text: chunks,
        embedding
    }
})) */
/** 
const result = await index.upsert({
    records: docs.map((docs, i) => ({
        id: `doc-${i}`,
        values: docs.embedding,
        Metadata: {
            text: docs.text
        }
    }))
})
    */


const queryEmbedding = await embedding.embedQuery("What is the story internship?")
console.log(queryEmbedding)

const result = await index.query({
    vector: queryEmbedding,
    topK: 2,
    includeMetadata: true
})

console.log(JSON.stringify(result))