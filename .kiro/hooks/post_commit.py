#!/usr/bin/env python3
"""
Kiro Agent Hook: Python Code Quality Enforcer
Automatically runs flake8 linter on backend Python files after git commits.
"""

import subprocess
import sys
import os
from pathlib import Path


def check_flake8_installed():
    """Check if flake8 is installed and available."""
    try:
        subprocess.run(['flake8', '--version'], capture_output=True, check=True)
        return True
    except FileNotFoundError:
        print('❌ ERROR: flake8 is not installed')
        print('Install it with: pip install flake8')
        return False
    except Exception as e:
        print(f'❌ ERROR checking flake8: {e}')
        return False


def run_linting():
    """Run flake8 linting on all Python files in backend directory."""
    backend_dir = Path('backend')
    if not backend_dir.exists():
        print('❌ ERROR: backend directory not found')
        return False
    
    py_files = list(backend_dir.glob('*.py'))
    if not py_files:
        print('⚠️  No Python files found in backend directory')
        return True
    
    print(f'🔍 Scanning {len(py_files)} Python file(s) in /backend:')
    for f in py_files:
        print(f'   - {f}')
    print()
    
    try:
        result = subprocess.run(
            ['flake8', 'backend/'],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            print('✅ SUCCESS: All Python files pass flake8 linting!')
            print('📊 0 issues found - Code is PEP8 compliant')
            return True
        else:
            issues = result.stdout.strip().split('\n')
            issue_count = len([i for i in issues if i.strip()])
            
            print(f'❌ FAILURE: Linting found {issue_count} issue(s)')
            print()
            print('📋 Detailed Error Output:')
            print('=' * 60)
            print(result.stdout)
            print('=' * 60)
            print()
            print('🔧 Common Issues to Fix:')
            print('   • Unused imports')
            print('   • Line length violations (>79 characters)')
            print('   • Spacing and indentation issues')
            print('   • Undefined variables')
            print('   • PEP8 style violations')
            print()
            print('💡 Action Required: Fix the issues above before committing')
            return False
            
    except subprocess.CalledProcessError as e:
        print(f'❌ ERROR running flake8: {e}')
        print(f'Output: {e.output}')
        return False
    except Exception as e:
        print(f'❌ Unexpected error: {e}')
        return False


def main():
    """Main entry point for the hook."""
    print('🐍 Python Code Quality Check - Post Commit Hook')
    print('=' * 60)
    print()
    
    if not check_flake8_installed():
        sys.exit(1)
    
    if run_linting():
        print()
        print('{"status": "success", "message": "All Python files pass quality checks"}')
        sys.exit(0)
    else:
        print()
        print('{"status": "failure", "message": "Code quality issues detected - fix before committing"}')
        sys.exit(1)


if __name__ == '__main__':
    main()
