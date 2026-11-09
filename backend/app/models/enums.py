from enum import Enum


class RepositoryType(str, Enum):  # noqa: UP042
    MY_REPOSITORY = "my_repository"
    PUBLIC_REPOSITORY = "public_repository"


class RepositoryStatus(str, Enum):  # noqa: UP042
    CONNECTED = "connected"
    ANALYZING = "analyzing"
    READY = "ready"
    FAILED = "failed"


class AnalysisJobStatus(str, Enum):  # noqa: UP042
    QUEUED = "queued"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
