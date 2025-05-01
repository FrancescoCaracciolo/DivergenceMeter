import requests
from typing import Dict, Optional, Any


class DivergenceMeterClient:
    """
    Client for the Divergence Meter API.
    Provides methods to interact with all available API endpoints.
    """
    
    def __init__(self, base_url: str = "http://divergence.nyarchlinux.moe/"):
        """
        Initialize the API client with the base URL.
        
        Args:
            base_url: The base URL of the API server (default: http://divergence.nyarchlinux.moe/)
        """
        self.base_url = base_url.rstrip('/')
        
    def get_divergence(self) -> Optional[float]:
        """
        Get the current divergence value.
        
        Returns:
            The current divergence value or None if no divergence exists
            
        Raises:
            requests.RequestException: If the API request fails
        """
        response = requests.get(f"{self.base_url}/api/divergence")
        response.raise_for_status()
        data = response.json()
        return data.get('divergence')
    
    def get_news(
        self, 
        page: int = 1, 
        per_page: int = 10, 
        min_impact: Optional[float] = None, 
        max_impact: Optional[float] = None
    ) -> Dict[str, Any]:
        """
        Get paginated news articles with divergence information.
        
        Args:
            page: Page number (default: 1)
            per_page: Number of articles per page (default: 10)
            min_impact: Minimum impact value to filter by (default: None)
            max_impact: Maximum impact value to filter by (default: None)
            
        Returns:
            Dictionary containing articles, pagination information, and filters
            
        Raises:
            requests.RequestException: If the API request fails
            ValueError: If the API returns an error response
        """
        params = {
            'page': page,
            'per_page': per_page
        }
        
        if min_impact is not None:
            params['min_impact'] = min_impact
        if max_impact is not None:
            params['max_impact'] = max_impact
            
        response = requests.get(f"{self.base_url}/api/news", params=params)
        response.raise_for_status()
        
        data = response.json()
        if 'error' in data:
            raise ValueError(data['error'])
            
        return data
    
    def get_plot_html(self) -> str:
        """
        Get the divergence plot as HTML.
        
        Returns:
            HTML string that can be embedded in a webpage
            
        Raises:
            requests.RequestException: If the API request fails
        """
        response = requests.get(f"{self.base_url}/api/plot")
        response.raise_for_status()
        return response.text


# Example usage
if __name__ == "__main__":
    client = DivergenceMeterClient()
    
    # Get current divergence
    try:
        divergence = client.get_divergence()
        print(f"Current divergence: {divergence}")
    except requests.RequestException as e:
        print(f"Failed to get divergence: {e}")
    
    # Get news articles
    try:
        news_data = client.get_news(page=1, per_page=5, min_impact=0.1)
        print(f"Found {news_data['pagination']['total_count']} articles")
        for article in news_data['articles']:
            print(f"- {article['title']} (Field: {article['field']})")
    except (requests.RequestException, ValueError) as e:
        print(f"Failed to get news: {e}")
    
    # Get plot HTML
    try:
        plot_html = client.get_plot_html()
        print(f"Plot HTML length: {len(plot_html)} characters")
    except requests.RequestException as e:
        print(f"Failed to get plot: {e}")
