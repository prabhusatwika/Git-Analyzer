class RepositoryService:
    """
    Business logic for repository management.
    """

    async def connect_repository(self):
        raise NotImplementedError()

    async def connect_public_repository(self):
        raise NotImplementedError()

    async def disconnect_repository(self):
        raise NotImplementedError()

    async def list_repositories(self):
        raise NotImplementedError()

    async def get_repository(self):
        raise NotImplementedError()

    async def delete_repository(self):
        raise NotImplementedError()
