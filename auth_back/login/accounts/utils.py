import requests

def fetch_doi_metadata(doi):
    doi = doi.strip().replace("https://doi.org/", "").replace("http://doi.org/", "")

    url = f"https://api.crossref.org/works/{doi}"

    try:
        response = requests.get(url, timeout=8)
        if response.status_code != 200:
            return None

        data = response.json()["message"]

        title = data.get("title", [""])[0] if data.get("title") else ""

        authors_list = data.get("author", [])
        authors = ", ".join(
            f"{a.get('given', '')} {a.get('family', '')}".strip()
            for a in authors_list
        )

        journal = data.get("container-title", [""])[0] if data.get("container-title") else ""

        year = None
        date_parts = data.get("published", {}).get("date-parts")
        if date_parts and date_parts[0]:
            year = date_parts[0][0]

        return {
            "title": title,
            "authors": authors,
            "journal": journal,
            "year": year,
            "link": f"https://doi.org/{doi}",
        }

    except (requests.RequestException, KeyError, IndexError):
        return None