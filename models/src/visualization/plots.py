from typing import Optional
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

sns.set_style("whitegrid")

def hist_plot_data(
    df: pd.DataFrame,
    bins: int = 30,
    figsize: tuple[int, int] = (12, 8)
) -> None:
    """
    Plot histograms for all numerical columns in a DataFrame.

    Parameters:
        df (pd.DataFrame): Input dataset
        bins (int): Number of bins for histogram
        figsize (tuple[int, int]): Figure size

    Returns:
        None
    """
    if not isinstance(df, pd.DataFrame):
        raise TypeError("df must be a pandas DataFrame")

    plt.rc("font", size=16)
    plt.rc("axes", labelsize=14, titlesize=14)
    plt.rc("legend", fontsize=14)
    plt.rc("xtick", labelsize=10)
    plt.rc("ytick", labelsize=10)

    df.hist(bins=bins, figsize=figsize)

    plt.show()


def plot_class_distribution(
    df: pd.DataFrame,
    target_col: str
) -> None:
    """
    Plot class distribution for a classification target variable.
    """
    if not isinstance(df, pd.DataFrame):
        raise TypeError("df must be a pandas DataFrame")

    if target_col not in df.columns:
        raise ValueError(f"'{target_col}' not found in DataFrame columns")

    plt.figure(figsize=(6, 4))
    sns.countplot(x=target_col, data=df,)
    plt.title("Class Distribution")
    plt.xlabel("Class")
    plt.ylabel("Count")
    plt.show()

def plot_correlation_heatmap(
    df: pd.DataFrame,
    figsize: tuple[int, int] = (10, 8)
) -> None:
    """
    Plot correlation heatmap for numerical features.
    """
    if not isinstance(df, pd.DataFrame):
        raise TypeError("df must be a pandas DataFrame")

    numeric_df = df.select_dtypes(include="number")

    if numeric_df.empty:
        raise ValueError("No numerical columns found for correlation heatmap")

    plt.figure(figsize=figsize)
    sns.heatmap(
        numeric_df.corr(),
        annot=True,
        fmt=".2f",
        cmap="coolwarm",
        square=True
    )
    plt.title("Feature Correlation Heatmap")
    plt.show()


def plot_feature_distribution(
        df: pd.DataFrame,
        feature: str,
        target: Optional[str] = None,
        bins: int = 30,
        n_cols: int= 2, 
):
    
    if not isinstance(df, pd.DataFrame):
        raise TypeError("df must be a pandas DataFrame")
    
    if feature not in df.columns:
        raise ValueError(f"'{feature}' not found in DataFrame")

    if target and target not in df.columns:
        raise ValueError(f"'{target}' not found in DataFrame")
    
    plt.figure(figsize=(12,8))

    if target:
        sns.histplot(data=df, x=feature, hue=target, bins=bins, kde=True, multiple='stack' )
        plt.title(f'{feature} Distribution by {target}')
    
    else:
        sns.histplot(data=df, x=feature, bins=bins, kde=True)
        plt.title(f'{feature} Distribution')

    plt.xlabel(feature)
    plt.ylabel("Frequency")
    plt.show()


def plot_multiple_features(df: pd.DataFrame, n_cols: int = 2, bins: int = 30):

    columns = df.columns

    n_rows = (len(columns) + n_cols - 1) // n_cols
    plt.figure(figsize=(n_cols * 6, n_rows * 4))

    for i, feature in enumerate(columns):
        plt.subplot(n_rows, n_cols, i + 1)
        sns.histplot(data=df, x=df[feature], bins=bins, kde=True)
        plt.title(f"{feature} Distribution")

    plt.tight_layout()
    plt.show()