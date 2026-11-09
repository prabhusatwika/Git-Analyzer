from urllib.parse import urlparse


def is_valid_github_url(url: str) -> bool:
    """
    Validate whether the given URL is a valid GitHub repository URL.
    """

    parsed = urlparse(url)

    if parsed.netloc != "github.com":
        return False

    parts = [p for p in parsed.path.split("/") if p]

    return len(parts) >= 2
