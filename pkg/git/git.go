package git

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

// IsGitRepo checks if a directory is a git repository
func IsGitRepo(dir string) (bool, error) {
	gitDir := filepath.Join(dir, ".git")
	info, err := os.Stat(gitDir)
	if err != nil {
		if os.IsNotExist(err) {
			return false, nil
		}
		return false, err
	}
	return info.IsDir(), nil
}

// Init initializes a new git repository
func Init(dir string) error {
	cmd := exec.Command("git", "init")
	cmd.Dir = dir
	return cmd.Run()
}

// Config sets a git config value
func Config(dir, key, value string) error {
	cmd := exec.Command("git", "config", key, value)
	cmd.Dir = dir
	return cmd.Run()
}

// AddRemote adds a remote to the repository
func AddRemote(dir, name, url string) error {
	cmd := exec.Command("git", "remote", "add", name, url)
	cmd.Dir = dir
	return cmd.Run()
}

// Pull pulls changes from remote
func Pull(dir string) error {
	cmd := exec.Command("git", "pull")
	cmd.Dir = dir
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("git pull failed: %w\n%s", err, string(output))
	}
	return nil
}

// Add adds files to staging
func Add(dir, path string) error {
	cmd := exec.Command("git", "add", path)
	cmd.Dir = dir
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("git add failed: %w\n%s", err, string(output))
	}
	return nil
}

// Commit commits staged changes
func Commit(dir, message string) error {
	cmd := exec.Command("git", "commit", "-m", message)
	cmd.Dir = dir
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("git commit failed: %w\n%s", err, string(output))
	}
	return nil
}

// HasChanges checks if there are uncommitted changes
func HasChanges(dir string) (bool, error) {
	cmd := exec.Command("git", "status", "--porcelain")
	cmd.Dir = dir
	output, err := cmd.Output()
	if err != nil {
		return false, err
	}
	return len(strings.TrimSpace(string(output))) > 0, nil
}

// Push pushes changes to remote
func Push(dir, remote string) error {
	cmd := exec.Command("git", "push", remote)
	cmd.Dir = dir
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("git push failed: %w\n%s", err, string(output))
	}
	return nil
}

// IsClean checks if working directory is clean
func IsClean(dir string) bool {
	cmd := exec.Command("git", "diff", "--quiet")
	cmd.Dir = dir
	err := cmd.Run()
	return err == nil
}
