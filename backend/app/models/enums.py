from enum import Enum


class RepositoryType(str, Enum):
    MY_REPOSITORY = "my_repository"
    PUBLIC_REPOSITORY = "public_repository"


class RepositoryStatus(str, Enum):
    CONNECTED = "connected"
    ANALYZING = "analyzing"
    READY = "ready"
    FAILED = "failed"


class AnalysisJobStatus(str, Enum):
    QUEUED = "queued"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"