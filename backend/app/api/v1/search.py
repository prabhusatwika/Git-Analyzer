from fastapi import APIRouter

from app.schemas.search import (
    SearchRequest,
    SearchResponse,
    SearchResult,
)

from app.services.search.semantic_search_service import (
    SemanticSearchService,
)

router = APIRouter(
    prefix="/search",
    tags=["Semantic Search"],
)

service = SemanticSearchService()


@router.get("/")
async def search_health():
    return {
        "message": "Search API is working"
    }


@router.post(
    "",
    response_model=SearchResponse,
)
async def semantic_search(
    request: SearchRequest,
):

    result = service.search(
    request.repository_name,
    request.query,
)

    docs = result["documents"][0]
    metas = result["metadatas"][0]
    distances = result["distances"][0]

    response = []

    for doc, meta, dist in zip(
        docs,
        metas,
        distances,
    ):

        response.append(
            SearchResult(
                file_path=meta["file_path"],
                language=meta["language"],
                content=doc,
                distance=dist,
            )
        )

    return SearchResponse(results=response)
@router.get("/debug/{repository_name}")
async def debug_repository(repository_name: str):

    collection = service.chroma.collection

    results = collection.get(
        where={"repository": repository_name},
        include=["documents", "metadatas"],
    )

    return {
        "repository": repository_name,
        "count": len(results["ids"]),
        "metadatas": results["metadatas"][:5],
    }