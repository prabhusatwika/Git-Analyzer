class RepoMindException(Exception):
    """Base exception for RepoMind AI."""


class RepositoryNotFoundException(RepoMindException):
    """Raised when repository is not found."""


class RepositoryAlreadyExistsException(RepoMindException):
    """Raised when repository already exists."""


class InvalidGitHubURLException(RepoMindException):
    """Raised when GitHub URL is invalid."""


class AnalysisFailedException(RepoMindException):
    """Raised when repository analysis fails."""
